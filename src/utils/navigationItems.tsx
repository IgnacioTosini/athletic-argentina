import { CiShoppingCart } from "react-icons/ci";

type NavigationItem = {
    id: string;
    label: string;
    href: string;
    sectionId?: string;
};

export const navigationItems: readonly NavigationItem[] = [
    { id: 'clubs', label: 'Clubes', href: '/#clubes', sectionId: 'clubes' },
    { id: 'process', label: 'Como funciona', href: '/#como-funciona', sectionId: 'como-funciona' },
    { id: 'shop', label: 'Tienda', href: '/#tienda', sectionId: 'tienda' },
    { id: 'faq', label: 'FAQ', href: '/#faq', sectionId: 'faq' },
];

export const navigationIcons = [
    {
        id: "cart",
        icon: CiShoppingCart,
        href: "/cart",
    },
];