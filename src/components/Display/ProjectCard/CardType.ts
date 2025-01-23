export default interface DataProps {
    _id: string;
    user: {
        id: any;
        email: string;
        firstName: string;
        lastName: string;
        image: string;
    };
    title: string;
    categorie: string;
    description: string;
    content: string;
    amount: number;
    amountMin: number;
    status: string;
    isPotuled: boolean;
    image: string;
    created_at: Date;
    updatedAt: Date;
    __v: 0;
}
