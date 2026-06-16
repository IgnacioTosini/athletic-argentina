'use client';

import { useEffect, useState, useTransition } from 'react';
import { ImageService } from '@/services/ImageService';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateClubFormValues, createClubSchema } from '@/schemas/club.schema';
import { createClubWithImages, updateClubWithImages } from '@/app/actions/clubWithImages.action';
import { ImageType } from '@/generated/prisma/enums';
import { getClubById } from '@/app/actions/club.action';
import { useClubModalStore } from '@/store/club.store';
import { toast } from 'react-toastify';
import './_clubForm.scss';

export default function ClubForm() {
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [isPending] = useTransition();
    const editingClubId = useClubModalStore(state => state.editingClubId);
    const close = useClubModalStore((state) => state.close);

    const [logoPreview, setLogoPreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateClubFormValues>({
        resolver: zodResolver(createClubSchema),
        defaultValues: {
            isActive: true,
        },
    });

    useEffect(() => {
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        };
    }, [logoPreview, bannerPreview]);

    useEffect(() => {
        const loadClub = async () => {
            if (!editingClubId) return;

            const club = await getClubById(editingClubId);

            if (!club) return;

            reset({
                name: club.name,
                slug: club.slug,
                description: club.description ?? "",
                discipline: club.discipline ?? "",
                foundedAt: club.foundedAt ?? undefined,
                isActive: club.isActive,
                socialInstagram: club.socialInstagram ?? "",
                socialFacebook: club.socialFacebook ?? "",
                socialTiktok: club.socialTiktok ?? "",
                website: club.socialWebsite ?? "",
                city: club.city ?? "",
            });

            const logo = club.images.find(
                image => image.type === ImageType.LOGO
            );

            const banner = club.images.find(
                image => image.type === ImageType.BANNER
            );

            if (logo) {
                setLogoPreview(logo.url);
            }

            if (banner) {
                setBannerPreview(banner.url);
            }
        };

        loadClub();
    }, [editingClubId, reset]);

    const handleLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setLogoFile(file);

        const previewUrl = URL.createObjectURL(file);
        setLogoPreview(previewUrl);
    };

    const handleBannerChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setBannerFile(file);

        const previewUrl = URL.createObjectURL(file);
        setBannerPreview(previewUrl);
    };

    const onSubmit = async (data: CreateClubFormValues) => {
        try {
            let logo;
            let banner;

            if (logoFile) {
                const res = await ImageService.uploadImage(logoFile, {
                    enableOptimization: true,
                    format: "webp",
                    maxWidth: 500,
                    maxHeight: 500,
                });

                if (res.success) {
                    logo = {
                        url: res.url,
                        publicId: res.public_id,
                        type: ImageType.LOGO,
                    };
                }
            }

            if (bannerFile) {
                const res = await ImageService.uploadImage(bannerFile, {
                    enableOptimization: true,
                    format: "webp",
                    maxWidth: 1280,
                    maxHeight: 720,
                });

                if (res.success) {
                    banner = {
                        url: res.url,
                        publicId: res.public_id,
                        type: ImageType.BANNER,
                    };
                }
            }

            if (editingClubId) {
                const res = await updateClubWithImages(
                    editingClubId,
                    data,
                    { logo, banner }
                );
                if (!res.ok) {
                    toast.error("Error al actualizar el club");
                }

                toast.success("Club actualizado exitosamente");
                reset();
                setLogoFile(null);
                setBannerFile(null);
                setLogoPreview('');
                setBannerPreview('');
                close();
            } else {
                const res = await createClubWithImages(
                    data,
                    { logo, banner }
                );
                if (!res.ok) {
                    toast.error("Error al crear el club");
                }

                toast.success("Club creado exitosamente");
                reset();
                setLogoFile(null);
                setBannerFile(null);
                setLogoPreview('');
                setBannerPreview('');
                close();
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form className="club-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="name">Nombre del Club</label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Club Atlético..."
                    required
                />
                {errors.name && (
                    <span className="error">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="slug">Slug (url)</label>
                <div className="slug-input">
                    <span className="slug-prefix">/clubes/</span>
                    <input
                        type="text"
                        id="slug"
                        {...register('slug')}
                        placeholder="club-atletico..."
                        required
                    />
                    {errors.slug && (
                        <span className="error">
                            {errors.slug.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    {...register('description')}
                    placeholder="Descripción del club..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="discipline">Disciplina</label>
                <input
                    type="text"
                    id="discipline"
                    {...register('discipline')}
                    placeholder="Disciplina del club..."
                />
                {errors.discipline && (
                    <span className="error">
                        {errors.discipline.message}
                    </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    {...register('city')}
                    placeholder="Ciudad del club..."
                />
                {errors.city && (
                    <span className="error">
                        {errors.city.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="founded">Año de Fundación</label>
                <input
                    type="number"
                    id="founded"
                    {...register('foundedAt', { valueAsNumber: true })}
                    placeholder="Año de fundación..."
                />
                {errors.foundedAt && (
                    <span className="error">
                        {errors.foundedAt.message}
                    </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="logo">Logo</label>

                <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                />

                {logoPreview && (
                    <Image
                        src={logoPreview}
                        alt="Preview Logo"
                        width={120}
                        height={120}
                    />
                )}
            </div>

            <div className="form-group">
                <label htmlFor="banner">Banner</label>

                <input
                    type="file"
                    id="banner"
                    accept="image/*"
                    onChange={handleBannerChange}
                />

                {bannerPreview && (
                    <Image
                        src={bannerPreview}
                        alt="Preview Banner"
                        width={300}
                        height={150}
                    />
                )}
            </div>

            <span className='social-label'>Redes sociales (Opcionales)</span>

            <div className="form-group">
                <label htmlFor="socialInstagram">Instagram</label>
                <input
                    type="text"
                    id="socialInstagram"
                    {...register('socialInstagram')}
                    placeholder="https://instagram.com/club..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="socialFacebook">Facebook</label>
                <input
                    type="text"
                    id="socialFacebook"
                    {...register('socialFacebook')}
                    placeholder="https://facebook.com/club..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="socialTiktok">Tiktok</label>
                <input
                    type="text"
                    id="socialTiktok"
                    {...register('socialTiktok')}
                    placeholder="https://tiktok.com/@club..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="website">Sitio web</label>
                <input
                    type="text"
                    id="website"
                    {...register('website')}
                    placeholder="https://club.com..."
                />
            </div>

            <div className="form-group checkbox-group">
                <label htmlFor="isActive">¿Activo?</label>
                <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                />
            </div>

            <div className="form-group button-group">
                <button type="button" className="submit-button cancel-button" onClick={close}>
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="submit-button create-button"
                >
                    {isPending ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}