import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    username: '',
    loggedIn: !!localStorage.getItem('token-admin'),
    avatarLink: '',
});

const setLogoutState = () => {
    setGlobalState('username', '')
    setGlobalState('loggedIn', false)
}

export { setGlobalState, useGlobalState, setLogoutState }