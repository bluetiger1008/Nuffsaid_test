import React, { useEffect, useState } from "react"
import { Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Alert from "./alert"

const useStyles = makeStyles({
  clearBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
  },
})

const NotificationColumn = ({ title, priority, messages }) => {
  const classes = useStyles()
  const [filteredMessages, setFilteredMessages] = useState([])

  useEffect(() => {
    if (
      messages.length > 1 &&
      messages[messages.length - 1].priority === priority
    ) {
      setFilteredMessages([...filteredMessages, messages[messages.length - 1]])
    }

    if (messages.length === 0) {
      setFilteredMessages([])
    }
  }, [messages])

  let severity = ""
  if (priority === 1) {
    severity = "error"
  } else if (priority === 2) {
    severity = "warning"
  } else {
    severity = "success"
  }

  const onClearMessage = (index) => {
    let arr = [...filteredMessages]
    arr.splice(index, 1)
    setFilteredMessages(arr)
  }

  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Typography>Count {filteredMessages.length}</Typography>
      {filteredMessages.map((message, i) => (
        <Box mb={1} key={i}>
          <Alert severity={severity} style={{ position: "relative" }}>
            {message.message}
            <Button
              className={classes.clearBtn}
              onClick={() => onClearMessage(i)}
            >
              Clear
            </Button>
          </Alert>
        </Box>
      ))}
    </div>
  )
}

export default NotificationColumn
