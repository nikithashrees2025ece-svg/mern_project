
export function TaskCard(title, value, description, icon, color) {

  const colors = {

    green: 'border-green-500 text-green-700 bg-green-50',

    orange: 'border-orange-500 text-orange-600 bg-orange-50',

    red: 'border-red-500 text-red-600 bg-red-50',

    purple: 'border-purple-500 text-purple-600 bg-purple-50'

  };

  return `

    <div class="bg-white rounded-2xl shadow-lg p-6
                border-l-4 ${colors[color] || colors.green}
                hover:shadow-xl hover:-translate-y-1
                transition duration-300">

      <div class="flex items-center justify-between">

        <div>

          <p class="text-gray-500 font-medium">
            ${title}
          </p>

          <h2 class="text-4xl font-extrabold mt-3">
            ${value}
          </h2>

          <p class="text-sm text-gray-500 mt-2">
            ${description}
          </p>

        </div>

        <div class="text-4xl">
          ${icon}
        </div>

      </div>

    </div>

  `;

}