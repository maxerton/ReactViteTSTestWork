import { useEffect, useState } from 'react'
import { Button, Container, Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import Main from './components/Main'

function App() {
  const [theme, setTheme] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.bsTheme = theme ? 'dark' : 'light'
  }, [theme])

  return (
    <>
    <Navbar sticky='top' bg={theme ? 'primary' : 'info'} className='text-black' expand='sm'>
      <Container>
        <Navbar.Brand href="#">React Bootstrap Vite App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Button variant='' onClick={() => setTheme(!theme)}><FontAwesomeIcon icon={faCircleHalfStroke} /></Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Container>
        <Main></Main>
      </Container>
    </>
  )
}

export default App
