// React
import { Outlet, NavLink as RoutedLink } from "react-router-dom";
// Chakra UI Styling
import { 
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
// Assets
import logoUrl from './assets/logo.svg';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Links = [["Photovoltaik", ""], ["Windkraft", "wind"], ["Biomasse", "biomass"], ["Wasserkraft", "water"]];
  const NavLinks = Links.map((link) => (
    <Link 
      as={RoutedLink} 
      to={link[1]}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>{link[0]}</Link>
  ));

  return (
    <div>
      {/* Global Navbar */} 
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              boxSize='40px'
              objectFit='cover'
              src={logoUrl}
              alt='Logo'

            />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {NavLinks}
            </HStack>
          </HStack>
        </Flex>

        {/* Dropdown Menu in mobile/portrait mode */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {NavLinks}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* Content, wird gesetzt durch React Router nested Component*/}
      <Outlet />

      {/* TODO Global Footer */}
    </div> 
  )
}

export default App
