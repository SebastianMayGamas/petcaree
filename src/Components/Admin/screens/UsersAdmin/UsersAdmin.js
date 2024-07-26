import React, { useState, useEffect } from 'react';
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { db } from "../../../../configuredatabase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles/UserAdmin.module.css'
// Asegúrate de tener un archivo de estilos

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userDocs = await getDocs(usersCollection);
                const usersData = userDocs.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    // Función para eliminar un usuario
    const handleDelete = async (id) => {
        try {
            const userDoc = doc(db, 'users', id);
            await deleteDoc(userDoc);
            // Actualiza el estado después de eliminar
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <div className="table-container">
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName || user.displayName}</td>
                        <td>{user.email}</td>
                        <td>{user.isSuperUser ? 'ADMIN' : 'Usuario'}</td>
                        <td>
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

function UsersAdmin() {
    return (
        <div>
            <NavbarAdmin />
            <UserTable />
        </div>
    );
}

export default UsersAdmin;