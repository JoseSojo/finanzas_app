import { BsColumnsGap, BsChatRightText, BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";

interface LinkItemInterface {
    ico: any,
    name: string,
    link:string
}

const LinkItem: React.FC<LinkItemInterface> = ({ico, name, link}) => {
    return(
        <Link to={link} className='flex-1 py-2 hover:flex-[2] flex flex-col justify-center items-center text-xl hover:bg-gray-100 transition-all'>
            {ico}
            <span className='text-sm font-bold'>
                {name}
            </span>
        </Link>
    )
}

const mockItems = [
    {
        ico:<BsChatRightText />,
        name:'Transacciones',
        link:'/'
    },
    {
        ico:<BsGraphUp />,
        name:'Informes',
        link:'/info'
    },
    {
        ico:<BsColumnsGap />,
        name:'Categorias',
        link:'/categories'
    }
]

interface FooterInterface {}
export const Footer: React.FC<FooterInterface> = ({}) => {
    return(
        <footer className='absolute bottom-0 w-full bg-gray-50 flex jsutify-center items-center'>
            {
                mockItems.map((item, i) => (
                    <LinkItem key={i} ico={item.ico} name={item.name} link={item.link} />
                ))
            }
        </footer>
    );
}