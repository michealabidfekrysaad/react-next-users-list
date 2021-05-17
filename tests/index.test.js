import { render, screen, fireEvent } from '@testing-library/react';
import Index from '../pages/index';
import Login from '../pages/login';
import Details, { getStaticPaths, getStaticProps } from '../pages/users/[id]';

// mock the history.pathname
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/users/[id]',
  }),
}));
// mock the link of next/link package
jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

let allPaths = [];
describe('Index rendering', () => {
  it('renders without crashing', () => {
    render(<Index />);
    const Header = screen.getByRole('heading', {
      name: /Welcome at/i,
    });
    expect(Header.textContent).not.toMatch(/change to red/i);
  });
});

describe('Login rendering', () => {
  it('renders with correct class name', () => {
    const wrapper = render(<Login />);
    let input = wrapper.container.querySelector('input');
    expect(input.className).toBe('form-control');
  });
  it('Make sure inputted text is shorter than max length', () => {
    render(<Login />);
    const button = screen.getByRole('button', {
      name: /login/i,
    });
    fireEvent.click(button);
    expect(button.className).toMatch('btn btn-secondary');
  });
});
describe('API calling happen without errors and checkbox Activation', () => {
  let person = '';
  it('return all the paths', async () => {
    let data = await getStaticPaths();
    data.paths.forEach((element) => {
      allPaths.push(+element.params.id);
    });
    expect(typeof data).toBe('object');
  });
  it('return the data for single user from API', async () => {
    const randomId = allPaths[Math.floor(Math.random() * allPaths.length)];
    person = await getStaticProps({ params: { id: randomId } });
    expect(typeof person).toBe('object');
  });

  it('checkbox is cheked or not', async () => {
    render(<Details person={person.props.person} />);
    const checkbox = screen.getByRole('checkbox', {
      checked: true,
    });
    const label = screen.getByTestId('spanActive');
    expect(label.textContent).toEqual('Active');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    expect(label.textContent).toEqual('InActive');
    expect(label.className).toEqual('text-danger');
  });
});
