package seg3x02.booksrestapi

import jakarta.persistence.*

@Entity
class Bio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0
    var biodata: String = ""
}