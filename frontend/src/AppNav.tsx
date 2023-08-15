import React, {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from "react-router-dom";

const pages = [
    {name: "Услуги", path: "services"},
    {name: "Партнеры", path: "partners"},
    {name: "Истории", path: "stories"},
    {name: "Профиль", path: "profile"},
];

export default function AppNav() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (<AppBar position="static">
        <Container maxWidth="lg">
            <Toolbar disableGutters classes={["nav-toolbar"]}>
                <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                    <IconButton size="large" aria-label="account of current user"
                                aria-controls="menu-appbar" aria-haspopup="true"
                                onClick={handleOpenNavMenu} color="primary">
                        <MenuIcon/>
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorElNav}
                          anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                          }} keepMounted
                          transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                          }} open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{display: {xs: "block", md: "none"}}}>
                        {pages
                            .map(({name, path}: { name: string; path: string; }) => (
                                <MenuItem key={path} onClick={() => {
                                    navigate(path);
                                    handleCloseNavMenu();
                                }}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                    </Menu>
                </Box>
                <Typography variant="h6" noWrap component="div" onClick={() => navigate("/")}
                            sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                    Свое Село
                </Typography>

                <Box sx={{mr: 2, display: {xs: "none", md: "flex"}}}>
                    <img className="image--ssuGm logoSplitted__image--GKH_r"
                         src="https://s32640.cdn.ngenix.net/external-resources/images/logo/logo-19359685-MAIN_SELO.svg"
                         alt="Своё | Село - от Россельхозбанка"/>
                    <Typography variant="h5" noWrap onClick={() => navigate("/")}
                                sx={{mr: 2, display: {xs: "none", md: "flex"}}} classes={["site-name"]}>
                        Свое Село
                    </Typography>
                </Box>
                <Stack
                    sx={{flexGrow: 1}}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        {pages
                            .filter(({path}) => path !== "profile")
                            .map(({name, path}: { name: string; path: string; }) => (
                                <Button key={path} onClick={() => navigate(path)} sx={{my: 2}}>
                                    {name}
                                </Button>
                            ))}
                    </Box>
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        <IconButton onClick={() => navigate("profile")} sx={{padding: 1}}>
                            <Avatar><PersonIcon/></Avatar>
                        </IconButton>
                    </Box>
                </Stack>
            </Toolbar>
        </Container>
    </AppBar>)
}
