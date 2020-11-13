import React from 'react'
import { Card ,CardContent,Typography } from '@material-ui/core'

function InfoBox({title,cases,total}) {
    return (
        <Card className='infoBox'>
          <CardContent>

              {/* title */}
              <Typography  className= 'infoBox__title' color='textSecondary'>
                  {title}
              </Typography>

              {/* {Number of cases today} */}
              <h2 className='infoBox__cases'>{cases}</h2>

              {/* {total cases} */}
              <Typography  className="infoBox__total" color='textPrimary'>
                  {total}
              </Typography>

          </CardContent>
        </Card>
    )
}

export default InfoBox

