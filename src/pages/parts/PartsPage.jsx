import { SearchParts } from "@/features/search-parts"
import { PartsList } from "@/entities/parts-list"

export const PartsPage = () => {

    return (
        <>
            <SearchParts />
            <PartsList />
        </>
    )
}