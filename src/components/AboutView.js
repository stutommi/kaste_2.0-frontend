// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Divider, Segment, List } from 'semantic-ui-react'
// Components
import InfoSection from './InfoSection'
import PopupLink from './PopupLink'

const headerStyle = {
  fontSize: 18
}

const AboutView = ({ show }) => {

  if (!show) {
    return null
  }

  return (
    <div style={{
      height: '100%',
      overflowY: 'scroll',
      paddingBottom: 25
    }}>
      <Container textAlign='left' style={{ fontSize: 16 }}>
        <Header textAlign='center' as='h1' style={{ paddingTop: 25, margin: 0 }}>
          About Kaste 2.0 <span role='img' aria-label='seedling'>🌱</span>
        </Header>

        <h3 style={headerStyle}>Aim:</h3>
        <p>Design and implement a responsive web app to monitor and water plants.</p>


        <h3 style={headerStyle}>Features:</h3>
        <ul>
          <li>Plantwatering functionality for two or more users</li>
          <li>Possibility to read plant info through charts</li>
          <li>Simple chat</li>
          <li>Rebooting Raspberry (that controls sensor data)</li>
        </ul>

        <Segment style={{ background: 'lightgreen' }}>
          <p>
            Any questions, tips, feedback or bug reports are much appreciated! Just
            post them in the chat or tommi.teetee@hotmail.com <span role='img' aria-label='happy smiley'>🙂</span>
          </p>
        </Segment>

        <h4 style={headerStyle}>Made by:</h4>
        <PopupLink
          name={'Tommi Tampio'}
          linkedInUrl={'https://www.linkedin.com/in/tommi-tampio-41b2b7113/'}
          githubUrl={'https://github.com/stutommi'}
          email={'tommi.teetee@hotmail.com'}
        />
        <span> - Web app</span>
        <br />
        <span>Matti Tampio - Raspberry / sensor configuration</span>

        <Divider section />

        <h3 style={headerStyle}>Get started:</h3>
        <List ordered>
          <List.Item>Navigate to settings from menu</List.Item>
          <List.Item>Provide an url that serves sensor data</List.Item>
          <List.Item>Navigate to &quot;Sensors&quot;-view to check sensor measurements</List.Item>
          <List.Item>Use features (watering, live feed) from the menu</List.Item>
          <List.Item>Use that chat if you dare <span role='img' aria-label='devil'>👻</span></List.Item>

        </List>

        <Divider section />

        <h3 style={headerStyle}>Client:</h3>

        <p>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/stutommi/kaste_2.0-frontend'>
            Link to code
          </a>
        </p>

        <p>Working with token based authetication, client side is done with React.
          Its state is managed with hooks for the most part and little with
          Apollos client. Layout is handled with inline styles and semantic-ui-react.
          Communication between client and server is done with Graphql.

        </p>
        <InfoSection header={'Layout and Menus'}>
          Kastes layout is designed mobile first, but should work in every screen size.
          Mobile menu has a fixed menu on top with logout and togglable sidebar,
          which contains view navigation and functionality. When screen size goes
          over mobile, the view changes to a fixed top menu, which displays navigation and
          functionality.
        </InfoSection>
        <InfoSection header={'Sensors'}>
          Sensors data is shown in sensors view. It shows the current value of sensor
            measurements and chart information on measurement history that can be shown by
            different time ranges. clicking on the leaf icon in plant sensors opens a new tab
            in wikipedia, showing the results matching the name of the plant.
        </InfoSection>
        <InfoSection header={'Chat'}>
          Kaste has a supersimple chat. Users can write and receive messages on realtime
            thanks to subscription based communication with server. Messages are stored in MongoDB.
        </InfoSection>
        <InfoSection header={'Settings'}>
          In order to see any sensor information, user needs to be connected to an endpoint
            that serves that information. This connection can be made in settings page. If
            client is able to connect to an endpoint provided by the user, it will start displaying
            and storing that information on database. Settings page also shows the status of the endpoint
        </InfoSection>
        <InfoSection header={'Live Feed'}>
          If the endpoint a user is connected to has a camera connection, users are able to monitor
            this connection through the &quot;Live Feed&quot; view. This is useful when you want to make sure
            that your plants are being watered after using watering functionality. Note that if you have a slow internet
            connection, the picture may refresh much slower (or completely), but the watering funcionality still works.
        </InfoSection>
        <InfoSection header={'Water Plants'}>
          Perhaps the most important feature of Kaste is its watering functionality. Provided that the
          watering mechanics are hooked correctly at users home, user is able to water their plants
          by pressing the &quot;Water Plants&quot; found on the menu. They are able to choose watering between durations
          of 1, 5 and 10 minutes. If there&quot;s a need to stop the watering process for whatever reasons,
          user can simply press &quot;Stop Watering&quot; found next to watering functionality.
        </InfoSection>

        <Divider section />

        <h3 style={headerStyle}>Server:</h3>

        <p>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/stutommi/kaste_2.0-backend'>
            Link to code
          </a>
        </p>

        <p>Servers main two tasks are handling Graphql requests coming from client and storing
          collecting and storing messages, user information and sensor data to mongoDB. It is important
          to note that all requests that client sends to other URLs go through the server. this is done to avoid
          mixed content warning that comes from making direct requests from Kaste (https) to sensor endpoints
          (possibly http).
        </p>
        <InfoSection header={'User information'}>
          User information contains name, username, password hash and an endpoint for sensordata.
          When ever a new endpoint is introduced, server logic will start fetching information from
          the endpoint.
        </InfoSection>
        <InfoSection header={'Messages'}>
          Messages are stored in MongoDB and used in the chat view of the client. It uses a subscription
          so any new message is delivered to chat in realtime without refreshing the page. Currently the
          message live forever in the DB without manual deletion, this could be changed in the future to last
          only a certain time.
        </InfoSection>
        <InfoSection header={'Sensor data'}>
          Servers two jobs for sensor data is to relay realtime sensor values and functionality to client
          and store values from all connected endpoints to database. These jobs are not connected to each other
          in any way. Server is always on update with all sensor endpoints of every user and fetches data from them
          at certain interval. If nobody is using an endpoint anymore, server stops fetching and storing data from it.
        </InfoSection>

        <Segment color='yellow'>
          Known issues:
          <ul>
            <li>Endpoint computer might not recover from reboot</li>
            <li>Tests insufficient (need to dig into graphql tests more)</li>
            <li>Loading component renders over menu</li>
            <li>Plant name is hardcoded</li>
            <li>Live feed can freeze with slow internet connection</li>
          </ul>
        </Segment>

        <Segment color='green'>
          Things to improve:
          <ul>
            <li>Clean codebase</li>
            <li>More tests</li>
            <li>More comments</li>
            <li>Improve Chat (amount of initial messages)</li>
            <li>Optimize chart ranges</li>
            <li>Add CO measurements to house sensors</li>
            <li>Add auto-watering feature</li>
            <li>Add feature to email user when plant is dry</li>
          </ul>
        </Segment>

      </Container>
    </div>
  )
}

// Proptypes
AboutView.propTypes = {
  show: PropTypes.bool.isRequired
}

export default AboutView