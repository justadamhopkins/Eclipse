import { render, screen } from '@tests/configs/customRender';

import { CoverHero } from './CoverHero';

const defaultProps = {
  title: 'Hi, I am Adam Hopkins',
  subtitle: 'Test subtitle',
  label: 'Software engineer',
};

describe('CoverHero', () => {
  it('renders a "View my work" link that scrolls to the footer', () => {
    render(<CoverHero {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'View my work' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#footer');
  });

  it('renders a "Github" link to the contact page', () => {
    render(<CoverHero {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'Github' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders a "Linked in" link to the contact page', () => {
    render(<CoverHero {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'Linked in' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders the CTA row after the subtitle', () => {
    render(<CoverHero {...defaultProps} />);
    const subtitle = screen.getByText('Test subtitle');
    const viewMyWork = screen.getByRole('link', { name: 'View my work' });
    // CTA row should come after the subtitle in the DOM
    expect(subtitle.compareDocumentPosition(viewMyWork)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
