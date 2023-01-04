import { useSelector } from "react-redux"

export default function Stories() {
    const stories = useSelector(state => state.auth.stories)
    const followers = useSelector(state => state.auth.followers)

    return (
        <div className="bg-gray-200 rounded-none">
            <div className="flex flex-row gap-2 p-3 bg-white items-center">
                {
                    stories.map((story) => {
                        return (
                            <div className="flex flex-col cursor-pointer">
                                <img src={story.src} className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5 rounded-full border-2" />
                                <h6 className="text-xs text-center">{followers[story.id].title}</h6>                              
                            </div>      
    )                  
                    })
                }
            </div>
        </div>
    )
}