
const styles = ((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(5),
      },
    },
    box: {
        display : "flex",
        alignItem:  "center",
        backgroundColor : "#81c784"
    },
    btnCapture:{
      position: "absolute",
      top: "88%",
      right: "10%",
      width: "15%",
      height: "10%",
      fontSize:"20px"
    }
  }));

  export default styles