import { render, screen, fireEvent, waitFor, within } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

        const onSubmitStub = jest.fn();

        await render(<SignInContainer onSubmit={onSubmitStub}/>)

        const user = screen.getByTestId('username');
        const pass = screen.getByTestId('password');
        const signin = screen.getByTestId('signinButton');

        expect(within(signin).getByText('Sign in!')).toBeDefined();

        await fireEvent.changeText(user, 'kalle');
        await fireEvent.changeText(pass, 'password');
        await fireEvent.press(signin);

        await waitFor(() => {
            expect(onSubmitStub).toHaveBeenCalledTimes(1);
            expect(onSubmitStub.mock.calls[0][0]).toEqual({username:'kalle', password: 'password'});
        });
    });
  });
});