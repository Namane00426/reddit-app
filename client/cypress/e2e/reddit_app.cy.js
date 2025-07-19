import React from 'react';
/* eslint-disable no-undef */
<reference types="cypress" />

describe('Reddit App E2E', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:3000'); 
  });

  it('Displays posts on initial load', () => {
    // Check that a heading or section for popular posts exists
    cy.contains('Reddit Search');

    // Ensure at least one post card is rendered
    cy.get('[data-testid="post-card"]').should('have.length.greaterThan', 0);
  });

  it('Search function works correctly', () => {
    // Type a search term into the search input field
    cy.get('[data-testid="search-input"]').type('react');
    

    // Submit the form
    cy.get('[data-testid="search-button"]').click(); 

    // Check that results contain the search term
    cy.get('[data-testid="post-card"]').contains('React').should('exist');
  });

  it('Search function works correctly (enter key submits)', () => {
  cy.get('[data-testid="search-input"]').type('react{enter}');
  cy.get('[data-testid="post-card"]').contains('React').should('exist');
});

  it('Sorts by "New" correctly', () => {
    // Click on the Sort button 
    cy.get('[data-testid="sort-button"]').select('new');

    // Check that each post belongs to the "New" sort
    cy.get('[data-testid="post-card"]').then(($dates) => {
    const dateList = [];
       $dates.each((index, el) => {
      const dateText = el.getAttribute('data-time');
      const dateObj = new Date(dateText);
      if (!isNaN(dateObj)) {
        dateList.push(dateObj.getTime()); 
      }
    });
      const sorted = [...dateList].sort((a,b) => b - a);
      expect(dateList).to.deep.equal(sorted);
    
    });
    
  });

  it('Opens a detailed view modal when a post is clicked', () => {
    // Click the first post card
    cy.get('[data-testid="post-card"]').first().click();

    // Check that a modal opens
    cy.get('[data-testid="post-modal"]').should('be.visible');

    // Ensure the modal contains expected content
    cy.get('[data-testid="post-modal"]').contains('comments');
  });

  it('Displays an error message on network failure', () => {
    // Intercept the API request and force a network error
    cy.intercept('GET', '**/api/posts/**', { forceNetworkError: true }).as('getPosts');

    // Reload the page to trigger the request
    cy.reload();

    // Check that an error message appears
    cy.get('[data-testid="error-message"]').should('exist');
  });
});