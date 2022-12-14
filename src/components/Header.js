import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="h-[60px] bg-white border-b broder-gray-300 flex items-center justify-center">
            <Link to={"/"}>
                <img className="h-[40px]" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" />
            </Link>
            
        </header>
    )
}
