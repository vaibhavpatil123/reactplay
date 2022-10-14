import { useColorModeValue } from '@chakra-ui/react'

//background color
export const darkBg = 'hsl(207, 26%, 17%)'
export const lightBg = 'hsl(0, 0%, 98%)'
//element color
export const darkElement = 'hsl(209, 23%, 22%)'
export const lightElement = 'hsl(0, 0%, 100%)'
//text color
export const lightModeText = 'hsl(200, 15%, 8%)'
export const darkModeText = 'hsl(0, 0%, 100%)'

export const CentralTheme = () => {
  let elementColor = useColorModeValue(lightElement, darkElement)
  let bgColor = useColorModeValue(lightBg, darkBg)
  let textColor = useColorModeValue(lightModeText, darkModeText)
  return {
    elementColor, bgColor, textColor
  }
}
