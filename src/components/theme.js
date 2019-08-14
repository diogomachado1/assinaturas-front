import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {

        secondary: {
            main: '#00b255',
            light: '#fff',
            contrastText: '#fff',
        },
        error: {
            main: '#f44336',
            light: '#fff',
            contrastText: '#fff',
        },
    },
});

export default theme;