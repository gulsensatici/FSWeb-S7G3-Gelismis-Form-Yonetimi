

/// <reference types="cypress" />

 const passingName='Dobby';
 const passingEmail='dobby@dobby.com';
 const failingEmail='dobby@dobbycom';
 const passingPassword='123456';
 const failingPassword='12345';
 const initialListLength=3;
describe('form testleri', ()=>{
beforeEach(()=>{
    cy.visit("http://localhost:3000");
});

it('form elemanlarının hepsi ekranda', ()=>{
    cy.get('input').should('have.length', 4);
    cy.get('button[type=submit]').should('be.visible');

})
it ('hatasız giriş yapınca, üye listesine ekleniyor', ()=>{
    
    cy.get("input['name='name']").type(passingName);
    cy.get("input['name='email']").type(passingEmail);
    cy.get("input['name='pass']").type(passingPassword);
    cy.get("input['name='term']").click();
    cy.get('button[type=submit]').click();
cy.get(".App.App-header ul li").should(
    "have.length",
    initialListLength-1
);
});
it ('sadece isim boşken form gönderilmiyor', ()=>{
    
    cy.get("input['name='name']").type("isim");
    cy.get("input['name='name']").clear();
    cy.get("input['name='email']").type(passingEmail);
    cy.get("input['name='pass']").type(passingPassword);
    cy.get("input['name='term']").click();
    cy.get("input[name='name].span").should('be.disabled');
    cy.get("input[name='name].span").should("have.text", "isim zorunlu");
    cy.get("button[type=submit]").should('be.disabled');
});

it ('şifre kısa veya boş iken form gönderilmiyor, hata mesajı görünüyor', ()=>{
    
    cy.get("input['name='name']").type(passingName);
    cy.get("input['name='email']").type("hatalibombabombacom");
    cy.get("input['name='pass']").type(passingPassword);

    cy.get("input['name='term']").click();
    cy.get("input[name='email].span").should('be.disabled');
    cy.get("input[name='email].span").should("have.text", "eposta alanında bir hata olabilir mi?");
    cy.get("button[type=submit]").should('be.disabled');
    cy.get("input['name='email']").clear()
    cy.get("input['name='email']").type(passingEmail);
    cy.get("button[type=submit]").should('not.exist');
});
})