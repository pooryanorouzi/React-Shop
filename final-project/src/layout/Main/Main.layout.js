import {Footer, Header} from './components';

const MainLayout = (props) => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    );
}

export {MainLayout};
