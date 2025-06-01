using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class weaponHadoverUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SerialNo",
                table: "WeaponHandovers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SerialNo",
                table: "WeaponHandovers");
        }
    }
}
