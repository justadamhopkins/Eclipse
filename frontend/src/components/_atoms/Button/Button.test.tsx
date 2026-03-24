import { render, screen } from '@tests/configs/customRender';

import { Button } from './Button';

describe('Button', () => {
  describe('button variant (no href)', () => {
    it('renders a <button> element', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' }),
      ).toBeInTheDocument();
    });

    it('has type="button" to prevent form submission', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await screen.getByRole('button').click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('link variant (with href)', () => {
    it('renders an <a> element', () => {
      render(<Button href="/contact">Get in touch</Button>);
      expect(
        screen.getByRole('link', { name: 'Get in touch' }),
      ).toBeInTheDocument();
    });

    it('has the correct href', () => {
      render(<Button href="/contact">Get in touch</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/contact');
    });

    it('supports hash hrefs for scroll targets', () => {
      render(<Button href="#footer">View my work</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#footer');
    });

    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(
        <Button
          href="/contact"
          onClick={onClick}
        >
          Get in touch
        </Button>,
      );
      await screen.getByRole('link').click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
