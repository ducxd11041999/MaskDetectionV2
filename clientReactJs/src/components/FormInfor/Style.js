const styles = (theme) => ({
    content: {
        display : "flex",
        alignItem:  "center",
        backgroundColor : "yellow",
        paddingLeft: "5px"
    },
    titile:{
        display : "flex",
        alignItem:  "center",
    },
    formTitleSize:{
        fontSize: "30px",
        textAlign: "center",
        backgroundColor: "#14e557"
    },
    formContentSize:{
        fontSize: "20px",
        textAlign: "center",
        // backgroundColor: ""
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            fontSize: "15px",
            borderWidth: 2
        },
    },
    txtFileSize:{
        fontSize: "15px",
        
    },
    pl10:{
        paddingLeft : "20px",
    },
    zoomButton:{
        fontSize: "15px"
    }
    
})
export default styles