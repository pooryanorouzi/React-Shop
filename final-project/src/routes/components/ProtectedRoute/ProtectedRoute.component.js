import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {MainLayout} from 'layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './ProtectedRoute.config';

const TargetPage = ({Component, hasLayout}) => {

    const isLoggedIn = localStorage.getItem('IS_LOGGED_IN') === 'true';

    if (isLoggedIn) {
        return <Navigate replace to={PATHS.HOME}/>
    }

    return (<History onRender={props => {
        return hasLayout ? (<MainLayout>
            <Component/>
        </MainLayout>) : <Component/>
    }}/>)
}

const ProtectedRoute = (props) => {
    const {component, hasLayout} = props;
    return (<TargetPage Component={component} hasLayout={hasLayout}/>);

}

ProtectedRoute.defaultProps = DEFAULT_PROPS;
ProtectedRoute.propTypes = PROP_TYPES;

export {ProtectedRoute};
