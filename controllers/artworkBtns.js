document.addEventListener('DOMContentLoaded', () => {
    const editBtns = document.querySelectorAll('.edit-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');

    editBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const artworkId = btn.parentElement.dataset.artworkId;
            window.location.href = `/update/${artworkId}`;
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const artworkId = btn.parentElement.dataset.artworkId;
            const response = await fetch(`/delete/${artworkId}`, { method: 'DELETE' });
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.log('Error deleting artwork');
            }
        });
    });
});