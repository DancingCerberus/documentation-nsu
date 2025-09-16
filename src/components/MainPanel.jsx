function MainPanel() {
    return (
        <div className="content">
            <h1>
                Автоматизированная генерация учебно-методических материалов для низкоресурсных языков.
            </h1>
            <h2>Описание</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga mollitia nesciunt perferendis quo quod repellendus soluta sunt? Consectetur, facere saepe.
            </p>
            <p>
                A accusantium aperiam deserunt dicta doloremque est, explicabo facilis iure laborum mollitia neque qui
                similique soluta temporibus voluptate. Corporis esse inventore laboriosam libero mollitia quibusdam
                temporibus tenetur ullam voluptatem voluptatibus. Culpa maxime necessitatibus obcaecati reprehenderit veniam! Cumque
                dolore, excepturi ipsa nam nobis sapiente. Commodi ex iure laudantium nemo numquam odit reiciendis vero.
            </p>
            <h2>Пример</h2>
            <img src="../../public/bert.png" alt="Bert"/>
            <table>
                <thead>
                <tr>
                    <th scope="col">Название модели</th>
                    <th scope="col">Описание</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">BERT</th>
                    <td>Bidirectional Encoder Representations from Transformers</td>
                </tr>
                <tr>
                    <th scope="row">Модель2</th>
                    <td>Lorem ipsum dolor sit amet, consectetur.</td>
                </tr>
                <tr>
                    <th scope="row">Модель3</th>
                    <td>Lorem ipsum dolor sit amet, consectetur.</td>
                </tr>
                </tbody>
            </table>
            <h2>Модули</h2>
            <ul className="content-list">
                <li>Tokenizer</li>
                <li>Embedding</li>
                <li>Encoder</li>
                <li>Task head</li>
            </ul>
        </div>
    );
}

export default MainPanel;