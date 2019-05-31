import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
  },
}))

const Page = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.page}>
      { children }
    </div>
  )
}

export default Page
