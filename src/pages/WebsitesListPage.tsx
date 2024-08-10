import { useQuery } from "react-query"
import { getWebsites } from "../clients/supabase"
import WebsitesCommandList from "../components/WebsitesCommandList"

export default function WebsitesListPage() {
    const { data: websites, isLoading } = useQuery({
        queryKey: "websites",
        queryFn: async () => {
            return getWebsites()
        }
    })

    return (
        <div className="flex justify-center items-center">
            <WebsitesCommandList websites={websites} loading={isLoading} />
        </div>
    )
}