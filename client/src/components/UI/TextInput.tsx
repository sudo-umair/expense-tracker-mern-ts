import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Button,
} from '@chakra-ui/react';

type TextInputProps = {
  label: string;
  helperText?: string;
  error?: string;
  touched?: boolean;
  name: string;
  type?: string;
  as?: string;
  placeholder?: string;
  value?: string | number;
  showLeftAddon?: boolean;
  leftAddon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <FormControl
      size={'sm'}
      style={{ marginBottom: '1rem' }}
      isInvalid={!!props.error}
    >
      <FormLabel size={'sm'} htmlFor={props.name}>
        {props.label}
      </FormLabel>
      <InputGroup size={'sm'}>
        {props.showLeftAddon && <InputLeftAddon children={props.leftAddon} />}

        <Input
          size={'sm'}
          id={props.name}
          name={props.name}
          type={show ? 'text' : props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />

        {props.type === 'password' && (
          <InputRightAddon
            children={
              <Button
                size={'sm'}
                variant={'ghost'}
                onClick={() => {
                  handleClick();
                }}
              >
                Show
              </Button>
            }
          />
        )}
      </InputGroup>

      {props.error && (
        <FormErrorMessage size={'sm'}>{props.error}</FormErrorMessage>
      )}
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextInput;
