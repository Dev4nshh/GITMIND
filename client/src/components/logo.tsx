import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { cn } from '@/lib/utils'

const Logo = ({className, showText = true}: {className?: string, showText?: boolean}) => {
    return (
        <Link to="/" className={`flex items-center gap-2 font-medium ${className}`}>
           <div className={cn("size-7", className)}> <img src={logo} alt="GitMind" className="size-full" /></div>
            {showText && <span className='font-semibold text-xl dark:text-white'>GitMind</span>}
        </Link>
    )
}

export default Logo
