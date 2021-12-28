import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align='center'>
      <Box
        mr='4'
        textAlign='right'
      >
        <Text>George Soares</Text>
        <Text
          color='gray.300'
          fontSize='small'
        >
          george.soares@gmail.com
        </Text>
      </Box>

      <Avatar
        size='md'
        name='George
        Soares'
        src='https://github.com/George-b1t.png'
      />
    </Flex>
  );
};