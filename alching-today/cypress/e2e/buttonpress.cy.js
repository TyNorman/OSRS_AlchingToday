describe('load Grand Exchange data', () => {
  it('should show all Grand Exchange items', () => {
    cy.visit('http://localhost:3000')
    cy.get('button[data-cy="getData"]').click();
  })
})