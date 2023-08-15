// @ts-ignore
import React from 'react'
import './App.css'
import {Box, Container, createTheme, ThemeProvider, Typography} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppNav from "./AppNav.tsx";
import {MainPage} from "./pages/main-page.tsx";
import {themeOptions} from "./config.ts";
import {ProfilePage} from "./pages/profile-page.tsx";
import {ServicePage} from "./pages/service-page.tsx";
import {ServicesPage} from "./pages/services-page.tsx";
import {StoriesPage} from "./pages/stories-page.tsx";
import {StoryPage} from "./pages/story-page";
import {PartnersPage} from "./pages/partners-page";
import {PartnerPage} from "./pages/partner-page";
import {UserContext, useCurrentUserState} from "./contexts/user-context.ts";

function App() {
    const currentStorage = useCurrentUserState();
    // const redirectToLogin = <Navigate to={"/profile"}/>;
    return ( // process.env.PUBLIC_URL
        <BrowserRouter basename={"/"}>
            <UserContext.Provider value={currentStorage}>
                <ThemeProvider theme={createTheme(themeOptions)}>
                    <div className="App">
                        <AppNav/>
                        <Container maxWidth="lg" sx={{mt: 3}}>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/profile" element={<ProfilePage/>}/>
                                <Route path="/services" element={<ServicesPage/>}/>
                                <Route path="/services/:id" element={<ServicePage/>}/>
                                <Route path="/partners" element={<PartnersPage/>}/>
                                <Route path="/partners/:id" element={<PartnerPage/>}/>
                                <Route path="/stories" element={<StoriesPage/>}/>
                                <Route path="/stories/:id" element={<StoryPage/>}/>
                            </Routes>
                        </Container>
                    </div>
                    <Box className="Footer">
                        <Container maxWidth="lg" sx={{my: 8, color: "#fff"}}>
                            <Typography variant={"body1"} component={"p"}>
                                <strong>Свое Село от Россельхозбанка</strong><br/>
                                Площадка для создания комфортной жизни за городом для тех, кто ценит спокойствие и
                                близость
                                к природе
                            </Typography>
                        </Container>
                    </Box>
                </ThemeProvider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
