
export const TableError = (error) => {
    <tr>
        <td colSpan={3} style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            Ошибка: {error.message}
        </td>
    </tr>
}