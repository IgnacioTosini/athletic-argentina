import React, { useState, useRef } from 'react';
import { useImageOptimizer, type ImageOptimizationOptions } from '@/hooks/useImageOptimizer';
import './_imageOptimizer.scss';
import Image from 'next/image';

interface ImageOptimizerPreviewProps {
    onImageOptimized?: (file: File, stats: { originalSize: number; optimizedSize: number; compressionRatio: number }) => void;
    onImageSelected?: (file: File) => void;
    options?: ImageOptimizationOptions;
    showPreview?: boolean;
    className?: string;
    initialImageUrl?: string; // Para mostrar imagen existente al editar
}

export const ImageOptimizerPreview: React.FC<ImageOptimizerPreviewProps> = ({
    onImageOptimized,
    onImageSelected,
    options = {},
    showPreview = true,
    className = '',
    initialImageUrl
}) => {
    const [preview, setPreview] = useState<string | null>(initialImageUrl || null);
    const [optimizationStats, setOptimizationStats] = useState<{
        originalSize: number;
        optimizedSize: number;
        compressionRatio: number;
    } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { optimizeImage, isOptimizing } = useImageOptimizer();

    // Efecto para resetear el componente cuando cambia initialImageUrl
    React.useEffect(() => {
        setPreview(initialImageUrl || null);
        setOptimizationStats(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [initialImageUrl]);

    const defaultOptions: ImageOptimizationOptions = {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.9,
        format: 'webp',
        maxSizeKB: 300,
        ...options
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        onImageSelected?.(file);

        // Crear preview del archivo original temporalmente
        const originalPreview = URL.createObjectURL(file);
        setPreview(originalPreview);

        try {
            // Optimizar la imagen SIN subirla
            const result = await optimizeImage(file, defaultOptions);

            // Actualizar estadísticas
            setOptimizationStats({
                originalSize: result.originalSize,
                optimizedSize: result.optimizedSize,
                compressionRatio: result.compressionRatio
            });

            // Mostrar preview de imagen optimizada
            if (showPreview) {
                URL.revokeObjectURL(originalPreview);
                setPreview(result.preview);
            }

            // Notificar al componente padre con el archivo optimizado
            onImageOptimized?.(result.file, {
                originalSize: result.originalSize,
                optimizedSize: result.optimizedSize,
                compressionRatio: result.compressionRatio
            });

        } catch (error) {
            console.error('Error al optimizar imagen:', error);
            // En caso de error, usar archivo original
            onImageOptimized?.(file, {
                originalSize: file.size,
                optimizedSize: file.size,
                compressionRatio: 0
            });
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const clearSelection = () => {
        setOptimizationStats(null);
        if (preview && preview !== initialImageUrl) {
            URL.revokeObjectURL(preview);
        }
        setPreview(initialImageUrl || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // NO enviar archivo vacío, solo limpiar estados locales
    };

    return (
        <div className={`imageOptimizer ${className}`}>
            <div className="imageOptimizerMain">
                <div className="imageOptimizerUpload">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="imageOptimizerInput"
                        id="imageOptimizerPreviewInput"
                        disabled={isOptimizing}
                    />
                    <label htmlFor="imageOptimizerPreviewInput" className="imageOptimizerLabel">
                        {isOptimizing ? (
                            <div className="imageOptimizerLoading">
                                <div className="spinner"></div>
                                <span>Optimizando imagen...</span>
                            </div>
                        ) : (
                            <>
                                <div className="imageOptimizerIcon">📸</div>
                                <div className="imageOptimizerText">
                                    <strong>Seleccionar imagen</strong>
                                    <p>Se optimizará automáticamente (sin subir aún)</p>
                                </div>
                            </>
                        )}
                    </label>
                </div>

                {showPreview && preview && (
                    <div className="imageOptimizerPreview">
                        <Image src={preview} alt="Preview" className="previewImage" width={200} height={200} />
                        {preview !== initialImageUrl && (
                            <button
                                type="button"
                                onClick={clearSelection}
                                className="clearButton"
                                aria-label="Quitar imagen"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}
            </div>

            {optimizationStats && (
                <div className="imageOptimizerStats">
                    <h4>📊 Estadísticas de Optimización</h4>
                    <div className="statsGrid">
                        <div className="statItem">
                            <span className="statLabel">Tamaño original:</span>
                            <span className="statValue">{formatFileSize(optimizationStats.originalSize)}</span>
                        </div>
                        <div className="statItem">
                            <span className="statLabel">Tamaño final:</span>
                            <span className="statValue">{formatFileSize(optimizationStats.optimizedSize)}</span>
                        </div>
                        <div className={`statItem ${optimizationStats.compressionRatio > 0 ? 'success' : 'info'}`}>
                            <span className="statLabel">
                                {optimizationStats.compressionRatio > 0 ? 'Reducción:' : 'Estado:'}
                            </span>
                            <span className="statValue">
                                {optimizationStats.compressionRatio > 0 
                                    ? `${optimizationStats.compressionRatio}%` 
                                    : '✨ Ya optimizada'
                                }
                            </span>
                        </div>
                        <div className="statItem info">
                            <span className="statLabel">Estado:</span>
                            <span className="statValue">⏳ Listo para subir al guardar</span>
                        </div>
                    </div>

                    <div className="optimizationDetails">
                        <p><strong>Configuración aplicada:</strong></p>
                        <ul>
                            <li>Tamaño máximo: {defaultOptions.maxWidth}×{defaultOptions.maxHeight}px</li>
                            <li>Calidad: {Math.round((defaultOptions.quality || 0.8) * 100)}%</li>
                            <li>Formato: {defaultOptions.format?.toUpperCase()}</li>
                            <li>Peso máximo: {defaultOptions.maxSizeKB}KB</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
