// Libraries
import React from 'react'
import { Table, Container, Header } from 'semantic-ui-react'

const AboutView = ({ show }) => {

  if (!show) {
    return null
  }

  return (
    <Container textAlign='center'>
      <Header as='h1' style={{ padding: 25 }}>
        About Kaste 2.0
      </Header>
      <Table style={{ background: 'lightgreen' }}>
        <tbody>
          <tr>
            <td>Aim:</td>
            <td>Design and implement a responsive web app to monitor and water plants.</td>
          </tr>
          <tr>
            <td>Features:</td>
            <td>
              <ul>
                <li>Plantwatering functionality for two or more users</li>
                <li>Possibility to read plant info through charts</li>
                <li>Simple chat</li>
                <li>Rebooting Raspberry (that controls sensor data)</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default AboutView