describe('sanity test', () => {
  it('should visits the app root url', () => {
    cy.visit('/');
    cy.contains('#header a:first-child', 'Music');
  });
});
