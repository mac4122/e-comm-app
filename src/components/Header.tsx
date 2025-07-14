import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header>
            <Link to='/home'><h4 className='header-links'>Home</h4></Link>
        </header>
    )
}