import { render } from '@tests/configs/customRender';

import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('has id="footer" for scroll target', () => {
    render(<SiteFooter />);
    expect(document.getElementById('footer')).toBeInTheDocument();
  });
});
