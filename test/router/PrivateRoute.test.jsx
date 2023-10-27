import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";


describe('Pruebas en el <PrivateRoute />', () => {
  
    test('debe mostrar el children si está autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
             logged: true,
             user:'abc',
             name:'Julian'
    }

    render(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <PrivateRoute>
                    <h1>Ruta privada</h1>
                </PrivateRoute>
            </MemoryRouter>            
        </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    });
})
