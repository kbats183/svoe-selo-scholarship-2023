import React, {useState} from "react";
import {PageHeader} from "../components/page-header";
import {useCurrentUser} from "../contexts/user-context";
import {Box, Button, Tab, Tabs, TextField, Alert, AlertTitle, Typography, CardContent, Card} from "@mui/material";
import {loginUser} from "../services/user";
import {setCookie} from "react-use-cookie";
import {User} from "../types/User";
import {useRegionsList} from "../hooks/use-regions-list";

const Field: React.FC<{
    label: string;
    value?: string;
    onChange: (newValue: string) => void;
    type?: "input" | "password";
    required?: boolean;
}> = ({label, value, onChange, type, required}) => {
    return (
        <Box sx={{my: 2}}>
            <TextField
                label={label}
                variant="outlined"
                size="small"
                value={value}
                type={type}
                required={required}
                onChange={e => onChange(e.target.value)}
                fullWidth
            />
        </Box>
    );
}

const LoginForm: React.FC = () => {
    const [loginInput, setLoginInput] = useState({login: "", password: ""});
    const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
    const {reloadAuth} = useCurrentUser();
    const login = () => {
        loginUser(loginInput.login, loginInput.password).then(({status, message, login, session_key}: {
            status: string;
            message?: string;
            login?: string;
            session_key?: string;
        }) => {
            if (status !== "authorized") {
                setLoginErrorMessage(message ?? "")
            } else if (login && session_key) {
                setCookie("userLogin", login, {days: 1});
                setCookie("userSession", session_key, {days: 1});
                reloadAuth();
            }
        });
    }
    return (
        <Box sx={{maxWidth: 1, mt: 1}}>
            <Field label="Логин" value={loginInput.login} required
                   onChange={v => setLoginInput(s => ({...s, login: v}))}/>
            <Field label="Пароль" value={loginInput.password} required type="password"
                   onChange={v => setLoginInput(s => ({...s, password: v}))}/>

            {loginErrorMessage && (
                <Alert severity="error">
                    <AlertTitle>Ошибка авторизации</AlertTitle>
                    {loginErrorMessage}
                </Alert>
            )}

            <Box sx={{mt: 1}}>
                <Button variant="contained" onClick={login}>Войти</Button>
            </Box>
        </Box>
    );
}

const RegForm: React.FC = () => {
    return (
        <Box sx={{maxWidth: 500, mt: 1}}>
            {/*<Field label="Логин"/>*/}
            {/*<Field label="Пароль"/>*/}
            <Button variant="contained">Зарегистрировать</Button>
        </Box>
    );
}

const NoLoginUserScreen: React.FC = () => {
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={(_, newValue: number) => setValue(newValue)}>
                    <Tab label="Войти"/>
                    <Tab label="Зарегистрироваться"/>
                </Tabs>
            </Box>

            {value === 0 && <LoginForm/>}
            {value === 1 && <RegForm/>}

        </div>
    )
}

const ProfileViewScreen: React.FC<{ user: User }> = ({user}) => {
    const regions = useRegionsList();
    const userRegion = regions.find(r => r.id === user.region);
    const {reloadAuth} = useCurrentUser();
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {user.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {user.login}
                </Typography>
                {userRegion && (
                    <Typography variant="body1">
                        <strong>Регион</strong>:&nbsp;
                        {userRegion.name}
                    </Typography>
                )}

                <Box sx={{mt: 1}}>
                    <Button variant="contained" onClick={() => {
                        setCookie("userLogin", "", {days: 1});
                        setCookie("userSession", "", {days: 1});
                        reloadAuth();
                    }}>Выйти</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export const ProfilePage: React.FC = () => {
    const {user} = useCurrentUser();
    console.log(user);
    return (
        <div>
            <PageHeader>Профиль</PageHeader>
            {user === null && <NoLoginUserScreen/>}
            {user && <ProfileViewScreen user={user}/>}
        </div>
    );
}
