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
    formSize:{
        fontSize: "30px",
        textAlign: "center",
        backgroundColor: "green"
    },
    formTitleSize:{
        fontSize: "20px",
        textAlign: "center",
        backgroundColor: "red"
    },
    formContentSize:{
        fontSize: "15px",
        textAlign: "center",
        backgroundColor: "yellow"
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
        paddingLeft : "10px"
    },
    
})
export default styles