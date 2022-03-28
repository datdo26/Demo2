import {createNavigationContainerRef} from '@react-navigation/native-stack';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export const openMainScreen = () => {
    // todo
    navigate('SideDrawer', {})
}

export const openContactDetailScreen = ({id}: { id: string }) => {
    // todo
    navigate('ContactDetailScreen', {id})
}