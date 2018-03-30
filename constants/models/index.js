export const MODELS = {
    tables : [{
        name: 'striveCard',
        columns: [
            { name: 'id', type: 'integer primary key autoincrement' },
            { name: 'content', type: 'text' },
            { name: 'date', type: 'datetime default CURRENT_DATE UNIQUE' }
        ]
    },{
        name: 'setting',
        columns: [
            { name: 'id', type: 'integer primary key' },
            { name: 'name', type: 'text' },
            { name: 'DowName', type: 'text' },
            { name: 'belongedTemple', type: 'text' },
            { name: 'email', type: 'text' }
        ]
    }]
}