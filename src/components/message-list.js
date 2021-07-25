import React, { Component } from "react"
import {
  AppBar,
  Typography,
  Box,
  Button,
  Grid,
  Snackbar,
  Container,
} from "@material-ui/core"

import Api from "../api"
import NotificationColumn from "./notification-column"
import Alert from "./alert"

class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      showErrorSnackBar: false,
      snackBarMessage: "",
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    if (message.priority === 1) {
      this.setState({
        showErrorSnackBar: true,
        snackBarMessage: message.message,
      })
    }
    this.setState({
      messages: [...messages.slice(), message],
    })
  }

  onClearMessages() {
    this.setState({
      messages: [],
    })
  }

  renderButtons() {
    const isApiStarted = this.api.isStarted()
    return (
      <Box display="flex" justifyContent="center" mt={2} mb={4}>
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (isApiStarted) {
                this.api.stop()
              } else {
                this.api.start()
              }
              this.forceUpdate()
            }}
          >
            {isApiStarted ? "Stop Messages" : "Start Messages"}
          </Button>
        </Box>

        <Button
          color="primary"
          variant="contained"
          onClick={() => this.onClearMessages()}
        >
          Clear
        </Button>
      </Box>
    )
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({
      showErrorSnackBar: false,
    })
  }

  render() {
    const { messages, showErrorSnackBar, snackBarMessage } = this.state
    return (
      <div>
        <AppBar position="static" color="transparent">
          <Box px={2} py={1}>
            <Typography variant="h4">Help.com Coding Challenge</Typography>
          </Box>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={showErrorSnackBar}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <Container>
          {this.renderButtons()}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <NotificationColumn
                title="Error Type 1"
                priority={1}
                messages={messages}
              />
            </Grid>
            <Grid item xs={4}>
              <NotificationColumn
                title="Warning Type 2"
                priority={2}
                messages={messages}
              />
            </Grid>
            <Grid item xs={4}>
              <NotificationColumn
                title="Info Type 3"
                priority={3}
                messages={messages}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default MessageList
