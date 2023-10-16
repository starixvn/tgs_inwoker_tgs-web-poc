import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.tertiary};
    color: ${(props) => props.theme.tertiary};
`;

const InputTextfield = styled.input`
    display: flex;
    align-items: flex-start;
    outline: none;
    border: 0;
    background-color: transparent;
    outline: none;
    width: 100%;
    font-size: 1rem;
    margin-left: 8px;
    color: ${(props) => props.theme.white};
    &::placeholder {
            color: ${(props) => props.theme.tertiary};
            font-weight: 700;
            line-height: 0.875rem;
        }

        &:focus {
            outline: none;
        }
`;

const Input = ({ placeholder, imageUrl, value, handleChange }: Props) => {
  return (
    <InputWrapper>
      {imageUrl && <img src={imageUrl} alt={"Search"} />}
      <InputTextfield
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default Input;
