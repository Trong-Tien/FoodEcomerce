export type UpdateCategory = {
    id :  string,
    name : string,
    description : string,
    imageUrl : File | null | string,
    categoryParentId : string
}