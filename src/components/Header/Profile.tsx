import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align='center'>
      {showProfileData && (
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
      )}
      
      <Avatar
        size='md'
        name='George
        Soares'
        src='https://github.com/George-b1t.png'
      />
    </Flex>
  );
};