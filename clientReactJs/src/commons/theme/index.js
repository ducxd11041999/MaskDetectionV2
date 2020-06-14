
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    color: {
            primary : "#f44336",
            secondary : "#1976d2",
            error : "#ff9800"
    },
    typography :{
            fontFamily: "Roboto"
    },
    shape: {
            borderRadius : "4px",
            backgroundColor : "#115293",
            textColor: "white"
    }
});

export default theme;